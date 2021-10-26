import React from 'react'
import ReactDOM from 'react-dom'
import { makeStyles } from '@material-ui/core/styles'
import ImageList from '@material-ui/core/ImageList'
import GridListTile from '@material-ui/core/GridListTile'

const sampleImageList = []

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
    },
    gridList: {
        width: 720,
        height: '100%',
    },
}));

export const List = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <ImageList className={classes.gridList} cols={3}>
                {sampleImageList.map((tile) => (
                    <GridListTile key={tile.img} cols={tile.cols || 1}>
                        <img src={tile.img} alt={tile.title} />
                    </GridListTile>
                ))}
            </ImageList>
        </div>
    );
}

if (document.getElementById('app')) {
    ReactDOM.render(<List />, document.getElementById('app'));
}
