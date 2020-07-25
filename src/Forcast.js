import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    overflow: 'hidden',
    backgroundColor: 'rbga(0,0,0,0)',
    marginTop:10,
    marginBottom:10
    
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ()',
    height:300,
  },
  title: {
    fontSize:'20px',
    marginBottom:5,
    color: theme.palette.primary.light,
  },
  subtitle:{
    fontSize:'15px',
  },
  titleBar: {
    
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  gridTileStyle:{
      height:100 
  }
}));

export default function Forcast(props) {

    const imageUrl = 'http://openweathermap.org/img/wn/'
  const classes = useStyles();
  let data
  if(props.data != undefined){
    //data = props.data.splice(0,30)
  }
  console.log(data)
 
  if (props.data !== undefined) {
    return (
        <div className={classes.root}>
      <GridList className={classes.gridList} cols={2.5}>
        {props.data.map((d) => (
             <GridListTile key={d.dt}> 
                          <img src={imageUrl+d.weather[0].icon+'@2x.png'} alt='adawdwadawd' />

            <div style={{position:'absolute',width:'300%' ,height:'5%',top:'-10%'}}>
             <GridList>
              <GridListTileBar
               title={new Date(d.dt_txt).toLocaleTimeString().replace('00', '').replace(':','')}
               titlePosition='top'
               subtitle={ '            \t\t\t\t'+new Date(d.dt_txt).toDateString()}
               classes={{
                root: classes.titleBar,
              }}
               
             />
             </GridList>
              <hr></hr>
             </div>
             <GridListTileBar style={{marginTop:310}}
               title={Math.round(d.main.temp)}
               subtitle={(d.weather[0].main)}
               
               classes={{
                 root: classes.titleBar,
                 title: classes.title,
                 subtitle:classes.subtitle
               }}
             />



         </GridListTile>

        ))}



        
      </GridList>
    </div>
  );
  }else{
      return null
  }

}