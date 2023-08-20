import { Grid, Paper } from '@mui/material'
import React from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const Challenges = () => {

    return (
        <div>
            <div className="m-4">
                <h2 className={`text-2xl font-bold tracking-tight text-gray-900`}>Ongoing challenges:</h2>
                <div className="grid grid-cols-3 gap-3 p-5">
                    <Paper className='p-3'>
                        <div style={{
                            width: 200, height: 200
                        }}>
                            <CircularProgressbar value={66} text={`${66}%`} />
                        </div>
                        <div className='font-bold'>By Nike</div>
                        <div>Chainperks : 100</div>
                    </Paper>
                    <Paper className='p-3'> 
                        <div style={{
                            width: 200, height: 200
                        }}>
                            <CircularProgressbar value={40} text={`${40}%`} />
                        </div>
                        <div className='font-bold'>By Apple</div>
                        <div>Chainperks : 27</div>
                    </Paper>
                    <Paper className='p-3'>
                        <div style={{
                            width: 200, height: 200
                        }}>
                            <CircularProgressbar value={13} text={`${13}%`} />
                        </div>
                        <div className='font-bold'>By Adidas</div>
                        <div>Chainperks : 68</div>
                    </Paper>
                </div>
            </div>
            <div className="m-4">
                <h2 className={`text-2xl font-bold tracking-tight text-gray-900`}>Completed challenges:</h2>
                <div className="grid grid-cols-3 gap-3 p-5">
                    <Paper className='p-3'>
                        <div style={{
                            width: 200, height: 200
                        }}>
                            <CircularProgressbar value={100} text={`${100}%`} />
                        </div>
                        <div className='font-bold'>By Haldiram</div>
                        <div>Chainperks : 50</div>
                    </Paper>
                    <Paper className='p-3'>
                        <div style={{
                            width: 200, height: 200
                        }}>
                            <CircularProgressbar value={100} text={`${100}%`} />
                        </div>
                        <div className='font-bold'>By Nike</div>
                        <div>Chainperks : 200</div>
                    </Paper>
                </div>
            </div>
        </div>
    )
}

export default Challenges