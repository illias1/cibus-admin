import React from "react";
import { Link } from "react-router-dom";
type IHomeProps = {};

const Home: React.FC<IHomeProps> = ({ ...props }) => {
  return (
    <div>
      <br />
      <Link to="/sample/2">to menu</Link>
    </div>
  );
};

export default Home;
