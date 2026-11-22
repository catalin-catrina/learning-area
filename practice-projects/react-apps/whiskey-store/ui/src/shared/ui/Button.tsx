type ButtonProps = {
  variant?: 'primary' | 'secondary' | 'tertiary';
  size?: 'small' | 'medium' | 'large';
  children: React.ReactNode;
};

function Button({ variant = 'primary', size = 'medium', children }: ButtonProps) {
  return <button className={`btn ${variant} ${size}`}>{children}</button>;
}

export default Button;
