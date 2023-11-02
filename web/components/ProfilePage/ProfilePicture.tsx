// --- Imports --- //
import React from "react";
import Image from 'next/image'

const ProfilePicture = ({url} : {url ?: string}) => {
    return (
        <div className="flex justify-center">
            {url ? (
                <Image src={url} width={187} height={187} alt="Profile" />
            ) : (
                <Image src="/Icons/profile.svg" width={187} height={187} alt="Profile" />
            )}
        </div>
    );
}

export default ProfilePicture;
