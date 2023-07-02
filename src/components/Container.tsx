function Container(props: { children: JSX.Element }) {
  const { children } = props
  return <div>{children}</div>
}

export default Container
