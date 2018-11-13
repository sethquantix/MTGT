import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
    progress: {
        margin: theme.spacing.unit * 2,
    },
});

const Loading = ({ classes, size, color = "#darkviolet" }) => {
    return <div>
        <CircularProgress size={size} color={color} className={classes.progress}/>
    </div>;
};

export default withStyles(styles)(Loading);
