import PropTypes from 'prop-types';
import { LiaTimesSolid } from 'react-icons/lia';

const ImgPreview = ({ photoInputRef, setPreviewImg, previewImg, className }) => {
    const handleClick = () => {
        photoInputRef.current.value = '';
        setPreviewImg(null);
    }

    return (<>{previewImg &&
        <div className={"w-full relative " + className}>
            <button onClick={handleClick}
                className="absolute -top-2 -right-2 border rounded-full p-1 text-lite bg-red-600 text-base">
                <LiaTimesSolid />
            </button>

            <img src={previewImg} className="rounded-md border border-desc h-full object-contain w-full" />
        </div>
    }</>);
};

ImgPreview.propTypes = {
    photoInputRef: PropTypes.object,
    setPreviewImg: PropTypes.func,
    previewImg: PropTypes.string,
    className: PropTypes.string
};

export default ImgPreview;