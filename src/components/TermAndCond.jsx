import React from 'react'
import { useNavigate } from 'react-router-dom'

function TermAndCond() {
    const navigate = useNavigate

    const hdlOnBack = () => {
        e.preventDefault()
        navigate("/register")
    }
    return (
        <div>
            <h1>Terms and Conditions</h1>
            <div>
                <h4>Terms and Conditions for [Website Name]</h4>
                <h4>Effective Date: [Date]</h4>
                <h4>Website: [URL of the Website]</h4>
            </div>
            <div>
                <div>
                    1. General Agreement
                    By using our website, you agree to these terms and conditions. If you do not agree with any part of these terms, please stop using the website immediately.
                </div>
                <div>
                    2. Registration
                    Users must register to use certain features and must provide accurate and truthful information.
                </div>
                <div>
                    3. Website Usage
                    You agree to use the website in a lawful manner and not engage in any activity that could disrupt the operation of the website, such as hacking or spamming.
                </div>
                <div>
                    4. Limitation of Liability
                    Our website is not liable for any damages arising from your use of the website or the information published on the website, including data loss.
                </div>
                <div>
                    5. Changes to Terms
                    We reserve the right to change these terms and conditions without prior notice.
                </div>
                <div>
                    6. Governing Law
                    These terms shall be governed by the laws of [Country/State], and you agree to submit to the jurisdiction of the courts in [Location] for any disputes that arise.
                </div>
                <div>
                    7. Contact Us
                    If you have any questions regarding these terms and conditions, please contact us at [Contact Email].
                </div>
            </div>
            <div>
                <button onClick={hdlOnBack}>BACK</button>
            </div>
        </div>
    )
}

export default TermAndCond