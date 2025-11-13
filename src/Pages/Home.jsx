import React from 'react';
import Static2 from '../Components/Static2';
import Static1 from '../Components/Static1';
import Banner from '../Components/Banner';
import LatestJobs from '../Components/LatestJobs';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <LatestJobs></LatestJobs>
            <Static2></Static2>
            <Static1></Static1>
        </div>
    );
};

export default Home;