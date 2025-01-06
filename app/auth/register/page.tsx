"use client";

import { RegisterForm } from "@/components/auth/register-form";
import { Icons } from "@/components/icons";
import LoginOptions from "../options/page";

export default function RegisterPage() {
  return (
    <div className="container relative flex-col justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 bg-zinc-900" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <Icons.briefcase className="mr-2 h-6 w-6" />
          JobScoutAI
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              "Finding the perfect job or candidate has never been easier. Join
              our platform and discover amazing opportunities."
            </p>
            <footer className="text-sm">The JobScoutAI Team</footer>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Create an account
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your details below to create your account
            </p>
          </div>
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}
