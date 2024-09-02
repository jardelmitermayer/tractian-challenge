import { FC } from "react";
import { useNavigate } from "react-router-dom";

import TractianLogo from '../../assets/tractian-logo.svg'

interface Props {
  reloadOnClick?: boolean;
}

export const Logo: FC<Props> = ({ reloadOnClick }) => {
  const navigate = useNavigate();

  return (
    <img
      alt="Logo"
      className="logo"
      src={TractianLogo}
      onClick={reloadOnClick ? () => navigate('/') : undefined}
    />
  );
};
