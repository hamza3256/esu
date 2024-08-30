import { Product, ProductFile, User } from "@/payload-types";
import { BeforeChangeHook } from "payload/dist/collections/config/types";
import { Access, CollectionConfig } from "payload/types";

const addUser: BeforeChangeHook = ({ req, data }) => {
  const user = req.user as User | null;
  return { ...data, user: user?.id };
};

// Type guard to check if an object is of type Product
function isProduct(product: number | Product): product is Product {
  return typeof product === 'object' && product !== null && 'product_files' in product;
}

// Type guard to check if an object is of type ProductFile
function isProductFile(file: number | ProductFile): file is ProductFile {
  return typeof file === 'object' && file !== null && 'id' in file;
}

const yourOwnAndPurchased: Access = async ({ req }) => {
  const user = req.user as User | null;

  if (user?.role === "admin") return true;
  if (!user) return false;

  const { docs: products } = await req.payload.find({
    collection: "products",
    depth: 0,
    where: {
      user: {
        equals: user.id,
      },
    },
  });

  const ownProductFileIds = products
    .map((prod) => {
      if (isProduct(prod)) {
        return isProductFile(prod.product_files)
          ? prod.product_files.id
          : prod.product_files.toString(); // Convert to string if it's a number
      }
      return null; // Handle the case where prod is not a Product
    })
    .filter(Boolean)
    .flat();

  const { docs: orders } = await req.payload.find({
    collection: "orders",
    depth: 2,
    where: {
      user: {
        equals: user.id,
      },
    },
  });

  const purchasedProductFileIds = orders
    .map((order) => {
      return order.products.map((product) => {
        if (typeof product === "string") {
          req.payload.logger.error(
            "Search depth not sufficient to find purchased file IDs"
          );
          return null;
        }

        if (isProduct(product)) {
          return isProductFile(product.product_files)
            ? product.product_files.id
            : product.product_files.toString();
        }

        return null; // Handle the case where product is not a Product
      });
    })
    .filter(Boolean)
    .flat();

  return {
    id: {
      in: [...ownProductFileIds, ...purchasedProductFileIds],
    },
  };
};


export const ProductFiles: CollectionConfig = {
  slug: "product_files",
  admin: {
    hidden: ({ user }) => user.role !== "admin",
  },
  hooks: {
    beforeChange: [addUser],
  },
  access: {
    read: yourOwnAndPurchased,
    update: ({ req }) => req.user.role === "admin",
    delete: ({ req }) => req.user.role === "admin",
  },
  upload: {
    staticURL: "/product_files",
    staticDir: "product_files",
    mimeTypes: ["image/*", "font/*", "application/postscript"],
  },
  fields: [
    {
      name: "user",
      type: "relationship",
      relationTo: "users",
      hasMany: false,
      admin: {
        condition: () => false,
      },
      required: true,
    },
  ],
};
