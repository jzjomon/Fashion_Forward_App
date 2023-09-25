import {  useSelector } from "react-redux";

const NavBar = () => {
    const { firstName, lastName } = useSelector((state) => state.user) ;
  return (
    <>
    <h1>name = {firstName} {lastName } </h1>
    </>
  )
}

export default NavBar