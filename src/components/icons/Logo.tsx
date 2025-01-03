import Image from "next/image"



const Logo = () => {
  return (
    <Image src={'/logo.png'} alt={`${process.env.SITE_NAME}`} width={50} height={50}/>
  )
}

export default Logo