import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ClassNames } from '@emotion/react';
import { AddShoppingCart, ImageAspectRatio } from '@mui/icons-material';
import { actionTypes } from './contextAPI/reducer';
import { useStateValue } from '../components/contextAPI/StateProvider';
import accounting from 'accounting';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function Product({product:{id, img, destination, rating, price, description, full_description} }) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const [{basket}, dispatch] = useStateValue();

  const addToBasket = () => {
    dispatch({
      type: actionTypes.ADD_TO_BASKET,
      item:{
        id,
        img,
        destination,
        rating,
        price,
        description,
        full_description,
      }
    })
  }

  // const addShoppingCart = () => {

  // }

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        action={
            <Typography className={ClassNames.action} variant='h5' color='textSecondary'>{accounting.formatMoney(price,"$", 0)}</Typography>
        }
        title={destination}
        subheader="DESTINO"
      />
      <CardMedia
        component="img"
        height="194"
        image = {img}
        alt="Destino"
      />

      <CardContent>
        <Typography variant="body2" color="text.secondary">
            {description}
        </Typography>
      </CardContent>

      <CardActions disableSpacing>
        <IconButton aria-label="add to shopping card" onClick={addToBasket}>
          <AddShoppingCart />
        </IconButton>
        <IconButton>
            {Array(rating)
              .fill()
              .map((_, i) => (
                  <p>&#11088;</p>
              ))
            }
        </IconButton>

        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>


      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph >
            {full_description}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
