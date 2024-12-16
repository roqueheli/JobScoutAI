"use client";

import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cn } from "@/lib/utils";

// Interfaces para props específicas
interface AvatarProps
  extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> {
  imageUrl?: string;
}

interface AvatarImageProps
  extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image> {
  onLoadingStatusChange?: (
    status: "idle" | "loading" | "loaded" | "error"
  ) => void;
}

interface AvatarFallbackProps
  extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback> {
  delayMs?: number;
}

// Componente Avatar principal
const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  AvatarProps
>(({ className, imageUrl, ...props }, ref) => {
  const [key, setKey] = React.useState(0);

  // Actualizar el key cuando cambia la URL de la imagen
  React.useEffect(() => {
    if (imageUrl) {
      setKey((prev) => prev + 1);
    }
  }, [imageUrl]);

  return (
    <AvatarPrimitive.Root
      key={key}
      ref={ref}
      className={cn(
        "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
        className
      )}
      {...props}
    />
  );
});
Avatar.displayName = AvatarPrimitive.Root.displayName;

// Componente AvatarImage con manejo de estados de carga
const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  AvatarImageProps
>(({ className, onLoadingStatusChange, ...props }, ref) => {
  const [loadingStatus, setLoadingStatus] = React.useState<
    "idle" | "loading" | "loaded" | "error"
  >("idle");

  const handleLoadingStatusChange = (
    status: "idle" | "loading" | "loaded" | "error"
  ) => {
    setLoadingStatus(status);
    onLoadingStatusChange?.(status);
  };

  return (
    <AvatarPrimitive.Image
      ref={ref}
      onLoadingStatusChange={handleLoadingStatusChange}
      className={cn(
        "aspect-square h-full w-full transition-opacity duration-300",
        loadingStatus === "loading" ? "opacity-0" : "opacity-100",
        className
      )}
      onError={(e) => {
        console.error("Error loading avatar image:", e);
        handleLoadingStatusChange("error");
      }}
      {...props}
    />
  );
});
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

// Componente AvatarFallback con delay configurable
const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  AvatarFallbackProps
>(({ className, delayMs = 600, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    delayMs={delayMs}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      "text-sm font-medium uppercase text-muted-foreground",
      className
    )}
    {...props}
  />
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

export { Avatar, AvatarImage, AvatarFallback };
