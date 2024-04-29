"use client";

import { trpc } from "~/trpc/client";
import { Loader2, XCircle } from "lucide-react";
import Image from "next/image";
import { buttonVariants } from "./ui/button";
import Link from "next/link";

interface VerifyEmailProps {
  token: string;
}

const VerifyEmail = ({ token }: VerifyEmailProps) => {
  const { data, isLoading, isError } = trpc.auth.verifyEmail.useQuery({
    token,
  });

  if (isError) {
    return (
      <div className="flex flex-col items-center gap-2">
        <XCircle className="h-8 w-8 text-red-600" />
        <h3 className="text-xl font-semibold">There was a problem</h3>
        <p className="text-sml text-muted-foreground">
          This token is not valid or might be expired. Please try again.
        </p>
      </div>
    );
  }

  if (data?.success) {
    return (
      <div className="flex h-full flex-col items-center justify-center">
        <div className="relative mb-4 h-60 w-60 text-muted-foreground">
          <Image src="/bear_email_sent.png" fill alt="the email was sent" />
        </div>
        <h3 className="text-2xl font-semibold">You&apos;re all set!</h3>
        <p className="text-mute-foreground mt-1 text-center">
          Thank you for verifying your email.
        </p>
        <Link className={buttonVariants({ className: "mt-4" })} href="/sign-in">
          Sign In
        </Link>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="h-8 w-8 animate-spin text-zinc-300" />
        <h3 className="text-xl font-semibold">Verifying...</h3>
        <p className="text-sml text-muted-foreground">
          This won&apos;t take long.
        </p>
      </div>
    );
  }
};

export default VerifyEmail;
