import LoadingGif from '../../assets/loading.gif';
import './styles.css';

const LoadingComponent = ()=>{
    return(
        <div className='app-loading-gif'>
            <img src={LoadingGif} alt="loading gif"></img>
        </div>
    )
}

export default LoadingComponent;