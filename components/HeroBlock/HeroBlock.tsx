export interface HeroBlockProps {
  children: JSX.Element
}

export const HeroBlock = ({ children}: HeroBlockProps): JSX.Element => {
  return <div className='hero-block'>{children}</div>
}