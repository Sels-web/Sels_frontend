import styled from "styled-components";
import { Link } from "react-scroll";
import Button from "@mui/material/Button";
import style from "../css/sidebar.module.css";

function Menu() {
  const StyledLink = styled(Link)`
    box-sizing: border-box;
    padding: 0px 40px 10px 40px;
    margin: 0 auto;
    text-align: center;
    // position: relative;
    // border: 1px solid red;
  `;

  const styles = {
    "&.MuiButton-text": {
      color: "black",
    },
  };
  return (
    <div>
      <StyledLink to="1" spy={true} smooth={true}>
        <span className={style.top_menu} style={{ paddingLeft: "150px" }}>
          <Button variant="text" sx={styles}>
            <div style={{ fontSize: "14px" }}>Section1</div>
          </Button>
        </span>
      </StyledLink>
      <StyledLink to="2" spy={true} smooth={true}>
        <span className={style.top_menu}>
          <Button variant="text" sx={styles}>
            Section2
          </Button>
        </span>
      </StyledLink>
      <StyledLink to="3" spy={true} smooth={true}>
        <span className={style.top_menu}>
          <Button variant="text" sx={styles}>
            Section3
          </Button>
        </span>
      </StyledLink>
      <StyledLink to="4" spy={true} smooth={true}>
        <span className={style.top_menu}>
          <Button variant="text" sx={styles}>
            Section4
          </Button>
        </span>
      </StyledLink>
    </div>
  );
}

export default Menu;
