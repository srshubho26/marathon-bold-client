import { FileInput, Label } from 'flowbite-react';
import PropTypes from 'prop-types';

const ImageInput = ({wrapperClass='', labelClass='', label, name, photoInputRef, setPreviewImg}) => {
    const handleFileInput = e => {
        const img = e.target.files[0];
        const reader = new FileReader();
        reader.onload = () => setPreviewImg(reader.result);
        img && reader.readAsDataURL(img);
    }

    return (<div className={wrapperClass}>
        <div className="mb-2 block">
            <Label className={labelClass} value={label} />
        </div>

        <FileInput name={name} ref={photoInputRef} onChange={handleFileInput} />
    </div>);
};

ImageInput.propTypes = {
    wrapperClass: PropTypes.string,
    labelClass: PropTypes.string,
    label: PropTypes.string,
    name: PropTypes.string,
    photoInputRef: PropTypes.object,
    setPreviewImg: PropTypes.func,
};

export default ImageInput;