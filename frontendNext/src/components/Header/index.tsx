import React from "react"
type Props = {
  name: string;
  buttonComponent? : any;
  isSmallText?: boolean;
}

const Header = ({
  name,buttonComponent,isSmallText = false
}: Props) => {

  return (
    <div className="mb-5 flex w-full items-center justify-between" ></div>

  )
}

export default Header
