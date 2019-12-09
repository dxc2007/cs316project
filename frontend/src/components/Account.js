import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { useStateValue } from '../state';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: 'none',
  },
}));

export default function Account() {
  const classes = useStyles();
  const [{ user }, dispatch] = useStateValue();

  return (
    <div>
      <Button color="primary" className={classes.button}
      >
        Account
      </Button>
    </div>
  );
}
