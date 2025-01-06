import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {};

const LoginOptions = (props: Props) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      const result = await signIn("google", {
        callbackUrl: "/auth/role-selection",
        redirect: false,
      });

      if (result?.error) {
        throw new Error(result.error);
      }

      if (result?.url) {
        router.push(result.url);
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to sign in with Google",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="w-full grid grid-cols-2 gap-4">
      <Button variant="outline" disabled={isLoading} type="button">
        <Icons.gitHub className="mr-2 h-4 w-4" />
        GitHub
      </Button>
      <Button
        variant="outline"
        disabled={isLoading}
        onClick={handleGoogleSignIn}
        type="button"
      >
        <Icons.google className="mr-2 h-4 w-4" />
        Google
      </Button>
    </div>
  );
};

export default LoginOptions;
