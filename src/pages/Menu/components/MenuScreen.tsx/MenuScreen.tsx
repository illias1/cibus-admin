import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { Typography, Box } from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
// components
import MenuItem from "./components/MenuItem";
import CategoriesSlider from "./components/CategoriesSlider";
import ItemPopup from "./components/ItemPopup";
import background from "../../../../assets/background.png";
type IMenuScreenProps = {};

const MenuScreen: React.FC<IMenuScreenProps> = ({ ...props }) => {
  const classes = useStyles();
  const [popupOpen, setpopupOpen] = React.useState<boolean>(false);
  const handleClose = () => {
    setpopupOpen(false);
  };
  const [items, setitems] = React.useState<TItems>({
    title: "",
    ingredients: [],
    price: 0,
    allergy: [],
    img: "",
  });
  return (
    <>
      <Modal
        className={classes.modal}
        open={popupOpen}
        onClose={handleClose}
        aria-labelledby="item-details-popup"
        aria-describedby="area-to-see-details-and-add-to-cart"
      >
        <ItemPopup
          handleClose={handleClose}
          items={{
            allergy: items.allergy,
            price: items!.price,
            title: items.title,
            ingredients: items?.ingredients,
            img: items.img,
          }}
        />
      </Modal>
      <img src={background} className={classes.image} alt="header" />
      <CategoriesSlider categories={sampleItems.map((item) => item.category)} />
      <Box className={classes.root}>
        {sampleItems.map(({ items, category }, i) => (
          <React.Fragment key={category}>
            <Typography
              id={`category-${category}`}
              className={classes.title}
              variant="h4"
            >
              {category}
            </Typography>
            {items.map(({ title, price, ingredients, allergy, img }, index) => (
              <MenuItem
                onClick={(e) => {
                  setpopupOpen(true);
                  setitems({ title, price, ingredients, allergy, img });
                }}
                key={index}
                title={title}
                ingredients={ingredients}
                price={price}
              />
            ))}
          </React.Fragment>
        ))}
      </Box>
    </>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    image: {
      borderBottomLeftRadius: theme.spacing(6),
      borderBottomRightRadius: theme.spacing(6),
      width: "100%",
    },
    root: {
      padding: "18px 23px",
    },
    title: {
      font: "SemiBold 17px/20px Josefin Sans",
      letterSpacing: 0,
    },
    modal: {
      display: "flex",
      alignItems: "center",
    },
  })
);

export default MenuScreen;

export type TItems = {
  title: string;
  price: number;
  ingredients: string[];
  allergy: string[];
  img: string;
};

const sampleItems: { category: string; items: TItems[] }[] = [
  {
    category: "Entrees",
    items: [
      {
        title: " title",
        price: 12.23,
        ingredients: [
          "Salad with Lynnhaven Farm Chèvre Frais",
          "Rye Crumble and Nasturtirum",
        ],
        allergy: ["Clean", "No alllergies"],
        img: "",
      },
    ],
  },
  {
    category: "Meal",
    items: [
      {
        title: "sample title",
        price: 12,
        ingredients: [
          "Salad with Lynnhaven Farm Chèvre Frais",
          "Rye Crumble and Nasturtirum",
        ],
        allergy: ["Clean", "No alllergies"],
        img: "",
      },
      {
        title: "sample title",
        price: 12,
        ingredients: [
          "Salad with Lynnhaven Farm Chèvre Frais",
          "Rye Crumble and Nasturtirum",
        ],
        allergy: ["Clean", "No alllergies"],
        img: "",
      },
      {
        title: "sample title",
        price: 12,
        ingredients: [
          "Salad with Lynnhaven Farm Chèvre Frais",
          "Rye Crumble and Nasturtirum",
        ],
        allergy: ["Clean", "No alllergies"],
        img: "",
      },
    ],
  },
  {
    category: "Dessert",
    items: [
      {
        title: "sample title",
        price: 12,
        ingredients: [
          "Salad with Lynnhaven Farm Chèvre Frais",
          "Rye Crumble and Nasturtirum",
        ],
        allergy: ["Clean", "No alllergies"],
        img: "",
      },
      {
        title: "sample title",
        price: 12,
        ingredients: [
          "Salad with Lynnhaven Farm Chèvre Frais",
          "Rye Crumble and Nasturtirum",
        ],
        allergy: ["Clean", "No alllergies"],
        img: "",
      },
      {
        title: "sample title",
        price: 12,
        ingredients: [
          "Salad with Lynnhaven Farm Chèvre Frais",
          "Rye Crumble and Nasturtirum",
        ],
        allergy: ["Clean", "No alllergies"],
        img: "",
      },
    ],
  },
  {
    category: "Aperitifs",
    items: [
      {
        title: "sample title",
        price: 12,
        ingredients: [
          "Salad with Lynnhaven Farm Chèvre Frais",
          "Rye Crumble and Nasturtirum",
        ],
        allergy: ["Clean", "No alllergies"],
        img: "",
      },
      {
        title: "sample title",
        price: 12,
        ingredients: [
          "Salad with Lynnhaven Farm Chèvre Frais",
          "Rye Crumble and Nasturtirum",
        ],
        allergy: ["Clean", "No alllergies"],
        img: "",
      },
      {
        title: "sample title",
        price: 12,
        ingredients: [
          "Salad with Lynnhaven Farm Chèvre Frais",
          "Rye Crumble and Nasturtirum",
        ],
        allergy: ["Clean", "No alllergies"],
        img: "",
      },
    ],
  },
];
