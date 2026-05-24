export default function CreateResumeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-1 flex-col min-h-0 overflow-hidden">
      {children}
    </div>
  );
}
