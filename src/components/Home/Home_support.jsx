import { Button, CloseButton, Input } from '@mantine/core'
import React, { useState } from 'react'

function Home_support() {
    const [value, setValue] = useState('Clear me');
    return (
        <div className='Support'>
            <div className="Support-block">
                <div className="Support-block-header">
                    <h2>Support 24/7</h2>
                    <div className="Support-block-info">
                        <span>Ask anything or get support. Our team is here to help you 24/7 with any questions or issues you might have. Feel free to reach out anytime.</span>
                    </div>
                </div>
                <div className="Support-block-navi">
                    <div>
                        <Input placeholder="Ask a question..." />
                    </div>
                    <Button id='submit'>Submit</Button>
                </div>
            </div>
        </div >
    )
}

export default Home_support;
