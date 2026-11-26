import Container from "../../../shared/layout/Container";

// Designs 9a–9c: a centered panel on the shop background.
function AuthCard({ title, intro, children }: { title: string; intro: string; children: React.ReactNode }) {
  return (
    <Container className="flex justify-center pb-24 pt-10 lg:pt-16">
      <div className="flex w-full max-w-110 flex-col gap-6 rounded-lg border border-border bg-surface p-6 lg:p-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-[30px] leading-9 lg:text-4xl">{title}</h1>
          <p className="text-muted">{intro}</p>
        </div>
        {children}
      </div>
    </Container>
  );
}

/** "——— New to Dramshop? ———" */
export function AuthDivider({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <hr className="flex-1 border-border" />
      <span className="text-sm text-muted">{children}</span>
      <hr className="flex-1 border-border" />
    </div>
  );
}

export default AuthCard;
