import { FC } from "react";

interface SettingsHeaderProps {
  title: string;
  description: string;
}

export const SettingsHeader: FC<SettingsHeaderProps> = ({
  title,
  description,
}) => {
  return (
    <div className="space-y-0.5">
      <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};
