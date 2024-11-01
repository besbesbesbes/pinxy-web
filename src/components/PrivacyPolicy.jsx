import React from 'react'


function PrivacyPolicy() {

    return (
        <div className='flex flex-col gap-8 p-2'>
            <h1 className='text-3xl text-center font-bold'>Privacy Policy</h1>
            <div className='flex flex-col gap-1 font-semibold text-base'>
                <h4>Privacy Policy for Pinxy</h4>
                <h4>Effective Date: 10/31/2024</h4>
                <h4>Website: www.pinxy.com</h4>
            </div>
            <div className='flex flex-col gap-5'>
                <div>
                    1. Information We Collect
                    We collect various types of information from users when you register or use our website, including:

                    Personal Information (Name, Email, Password)
                    Usage Information (Searches, Posts, Comments)
                    Location Information (if enabled)
                </div>
                <div>
                    2. How We Use Your Information
                    The information we collect is used for:

                    Improving and developing the website
                    Communicating with users
                    Sending updates and promotional materials
                </div>
                <div>
                    3. Sharing Your Information
                    We do not sell or share your personal information with third parties, except in the following cases:

                    When required by law
                    To prevent fraud or inappropriate usage
                </div>
                <div>
                    4. Data Security
                    We have appropriate security measures in place to protect your personal information from unauthorized access.
                </div>
                <div>
                    5. User Rights
                    Users have the right to access, edit, or delete their personal information at any time.
                </div>
                <div>
                    6. Changes to the Policy
                    We may update this policy periodically and will notify you of any changes via the website.
                </div>
                <div>
                    7. Contact Us
                    If you have any questions about our privacy policy, please contact us at pinxy@gmail.com.
                </div>
            </div>
        </div>
    )
}

export default PrivacyPolicy