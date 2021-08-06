
interface Props {
    type: 'fab' | 'fal' | 'fas' | 'fad' | 'far';
    iconName: string;
    className?: string;
    style?: React.CSSProperties;
}

const FontAwesomeIcon = ({ type, iconName, className, style}: Props) => {

    const styles = style ? style : {};

    return (
        <i className={`${type} ${iconName} ${className}`} style={{ ...styles }}></i>
    )
}

export default FontAwesomeIcon
