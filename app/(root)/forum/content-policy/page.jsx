'use client';
import React from 'react';
import FeedGetStart from "../feedGetStart";
import FeedList2 from '../feedList2';

export default function Page() {
    const data = {
        title: 'Content Policy',
        contents: [
            "Welcome to the Raise Forum! To maintain a positive, respectful, and productive environment for all members, we have established the following content policy:",
            "All users are expected to engage in discussions with respect and courtesy. Personal attacks, harassment, and hate speech will not be tolerated. Disagreements should be handled professionally, with an emphasis on constructive criticism and healthy debate. The content shared on Raise Forum should be relevant to crowdfunding, Web3, and the projects within the Raise ecosystem. Spam, off-topic posts, and promotional content that do not align with the forum’s purpose are prohibited.",
            "We take intellectual property seriously, so please ensure that all content you share, including text, images, and media, is original or properly attributed to the source. Plagiarism, unauthorized sharing of copyrighted material, or intellectual property infringement will result in content removal and may lead to account suspension. Transparency and honesty are fundamental to our community. All communications should be truthful and accurate. ",
            "Misleading information, false claims, or deceptive practices are strictly forbidden. Project creators are especially expected to provide accurate and up-to-date information about their projects, including any associated risks and rewards.",
            "Respect for privacy is essential. Do not share personal or sensitive information about others without their consent, including private messages, contact details, or any other personal data. We strictly prohibit doxxing or revealing personal identities. Additionally, any content that promotes or encourages illegal activities, including but not limited to fraud, hacking, or the sale of illegal substances, is strictly prohibited. ",
        ]
    };
    return (<div className="xl:grid xl:grid-cols-12 gap-8 xl:my-12">
        <div className='col-span-7'>
            <h1 className="uppercase text-5xl font-bold text-brand-dark mb-8 font-heading">
                {data.title}
            </h1>
            {data.contents?.map((content, index) => (
                <p key={index} className="text-2xl font-bold text-brand-dark mb-7 text-opacity-70 font-heading ">
                    {content}
                </p>
            ))}

        </div>
        <div className="col-span-5 flex flex-col  gap-6">
            <FeedGetStart />
            <FeedList2 />
        </div>
    </div>)
}