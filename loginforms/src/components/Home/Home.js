import React, { useEffect, useState } from 'react';
import Iframe from 'react-iframe';
import "./Home.css";
function Home(props) {
    const [isBackButtonClicked, setBackbuttonPress] = useState(false)

    useEffect(() => {

        window.history.pushState(null, null, window.location.pathname);
        window.addEventListener('popstate', onBackButtonEvent);

        //logic for showing popup warning on page refresh
        window.onbeforeunload = function () {

            return "Data will be lost if you leave the page, are you sure?";
        };
        return () => {
            window.removeEventListener('popstate', onBackButtonEvent);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const onBackButtonEvent = (e) => {
        e.preventDefault();
        if (!isBackButtonClicked) {

            if (window.confirm("Please click on logout to go back")) {
                setBackbuttonPress(true)
                window.history.pushState(null, null, window.location.pathname);
            } else {
                window.history.pushState(null, null, window.location.pathname);
                setBackbuttonPress(false)
            }
        }
    }
    const demos = {
        autodesk:
            '<iframe width="100%" height="1000px" scrolling="yes" frameborder="no"  src="https://en.wikipedia.org/wiki/Autodesk"></iframe>',
    };
    function Iframe(props) {
        return (
            <div
                dangerouslySetInnerHTML={{ __html: props.iframe ? props.iframe : "" }}
            />
        );
    }
    return (
        <div className="full-height">
            <Iframe iframe={demos["autodesk"]} allow="autoplay" />,

        </div>
    )
}

export default Home;