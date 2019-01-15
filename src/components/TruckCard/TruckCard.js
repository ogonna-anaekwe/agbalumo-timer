/* eslint-disable no-console */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Typography from '@material-ui/core/Typography';
// import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import Favorite from '@material-ui/icons/Favorite';
import AddBox from '@material-ui/icons/AddBox';
import PhonelinkRing from '@material-ui/icons/PhonelinkRing';
import Email from '@material-ui/icons/Email';

const styles = {
  card: {
    maxWidth: 345,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    marginTop: 70,
    boxShadow: '0px 5px 7px 5px rgba(0, 0, 255, 0.15)',
  },
  media: {
    height: 250,
  },
  link: {
    textDecoration: 'none',
    color: 'rgba(0, 0, 0, 0.87)',
  },
  button: {
    borderRadius: 15,
    boxShadow: '0px 5px 7px 5px rgba(0, 0, 255, 0.06)',
  },
};

function TruckCard(props) {
  const { classes, truck, setFavorite } = props;
  const [openSnack, setopenSnack] = useState(false);
  const handleCloseSnack = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setopenSnack(false);
  };
  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={truck.image}
          title={`${truck.name} going for ${truck.price}`}
        />
        <CardContent>
          <Typography gutterBottom variant="overline" component="h2">
          {truck.name}
          </Typography>
          <Typography gutterBottom variant="caption" component="h2">
            ${truck.price}
          </Typography>
          <Typography component="p">
            {truck.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Link className={classes.link} to={`/details?id=${truck.id}`}>
          <Button className={classes.button} size="small" color="primary">
            <AddBox />
          </Button>
        </Link>
        <Button
          className={classes.button}
          onClick={() => {
            setFavorite(truck.id);
            setopenSnack(!openSnack);
          }}
          disabled={truck.favorite}
          size="small"
          color="primary"
        >
          <Favorite />
          <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            open={openSnack}
            autoHideDuration={3000}
            onClose={handleCloseSnack}
            ContentProps={{
              'aria-describedby': 'message-id',
            }}
            message={<span id="message-id">{truck.name} added to favorites!</span>}
          />
        </Button>
        <Button
            aria-haspopup="true"
            className={classes.button}
            size="small"
            color="primary"
            href={`tel:${truck.contact_info.phone_number}`}
          >
            <PhonelinkRing />
          </Button>
          <Button
            aria-haspopup="true"
            className={classes.button}
            size="small"
            color="primary"
            href={`mailto:${truck.contact_info.email}`}
          >
            <Email />
          </Button>
      </CardActions>
    </Card>
  );
}


TruckCard.propTypes = {
  classes: PropTypes.object.isRequired,
  truck: PropTypes.object.isRequired,
  setFavorite: PropTypes.func.isRequired,
};

export default withStyles(styles)(TruckCard);
