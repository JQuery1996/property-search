import { ReactNode, cloneElement, isValidElement } from "react";

type ShareWrapperProps = {
  children: ReactNode;
  shareData: { title: string; text: string; url: string };
};

export function ShareWrapper({ children, shareData }: ShareWrapperProps) {
  const handleShare = async () => {
    try {
      if (navigator.share) {
        // Use the Web Share API if supported
        await navigator.share(shareData);
      } else {
        // Fallback: Copy the URL to the clipboard using the Clipboard API
        await navigator.clipboard.writeText(shareData.url);
        alert("Link copied to clipboard!");
      }
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  // Clone the children and add the onClick handler
  if (isValidElement(children)) {
    return cloneElement(children, {
      onClick: handleShare,
    } as any);
  }

  // If children is not a valid React element, return it as-is
  return children;
}
