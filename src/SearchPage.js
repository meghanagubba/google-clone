import React from 'react';
import './SearchPage.css';
import { useStateValue } from './StateProvider';
import useGoogleSearch from './useGoogleSearch';
import { Link } from "react-router-dom";
import Search from './Search';
import SearchIcon from '@material-ui/icons/Search';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import SlideshowIcon from '@material-ui/icons/Slideshow';
import WebOutlinedIcon from '@material-ui/icons/WebOutlined';
import LocalOfferOutlinedIcon from '@material-ui/icons/LocalOfferOutlined';
import MoreVertIcon from '@material-ui/icons/MoreVert';

function SearchPage() {
    const [{ term }, dispatch] = useStateValue();
    const { data } = useGoogleSearch(term);

    //MOCK API CALL
   // const data = Response;
    console.log(data);
    return (
        <div className='searchPage'>
            <div className='searchPage_header'>
                <Link to="/">
                <img className="searchPage__logo" src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png" alt="" />
                </Link>
                <div className="searchPage__headerBody">
                    <Search hideButtons />

                    <div className="searchPage__options">
                        <div className="searchPage__optionsLeft">
                            <div className="searchPage__option">
                                <SearchIcon />
                                <Link to="/">All</Link>
                            </div>
                            <div className="searchPage__option">
                                <ImageOutlinedIcon />
                                <Link to="/">Images</Link>
                            </div>
                            <div className="searchPage__option">
                                <SlideshowIcon />
                                <Link to="/">Videos</Link>
                            </div>
                            <div className="searchPage__option">
                                <WebOutlinedIcon />
                                <Link to="/">News</Link>
                            </div>
                            <div className="searchPage__option">
                                <LocalOfferOutlinedIcon />
                                <Link to="/">Shopping</Link>
                            </div>
                            <div className="searchPage__option">
                                <MoreVertIcon />
                                <Link to="/">More</Link>
                            </div>
                        </div>

                        <div className="searchPage__optionsRight">
                            <div className="searchPage__option">
                                <Link to="/settings">Settings</Link>
                            </div>
                            <div className="searchPage__option">
                                <Link to="/tools">Tools</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {term && (
            <div className='searchPage_results'>
                <p className="searchPage__resultCount">About {data?.searchInformation.formattedTotalResults} results ({data?.searchInformation.formattedSearchTime} seconds) for {term}</p>
                {data?.items.map(item=>(
                    <div className='searchPage__result'>
                        <a href={item.link}>
                            {item.pagemap?.cse_image?.length > 0 && item.pagemap?.cse_image[0]?.src&& (<img className="searchPage__resultImage" src={item.pagemap?.cse_image?.length > 0 && item.pagemap?.cse_image[0]?.src} alt="" />)}
                            {item.displayLink}
                        </a>
                        <a className="searchPage__resultTitle" href={item.link}>
                            <h2>{item.title}</h2>
                        </a>
                        <p className="searchPage__resultSnippet">{item.snippet}</p>
                    </div>
                ))}
            </div>
            )}
        </div>
    )
}

export default SearchPage
