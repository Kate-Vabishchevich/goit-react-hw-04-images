import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';
import { useState } from 'react';
import Modal from 'components/Modal/Modal';

const ImageGalleryItem = ({webformatURL, tags, largeImageURL}) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleModal = () => setIsOpen(!isOpen);

        return (
            <li className={css.item}>
                <img
                    src={webformatURL}
                    alt={tags}
                    source={largeImageURL}
                    className={css.img}
                    onClick={handleModal}
                />
                {isOpen && (
                    <Modal
                        largeImageURL={largeImageURL}
                        onClose={handleModal}
                    />
                )}
            </li>
        );
}

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
}