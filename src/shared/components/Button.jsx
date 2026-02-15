
export default function Button({ children, variant='primary', ...props }) {
  const cls = `btn btn-${variant}`;
  return <button className={cls} {...props}>{children}</button>
}
