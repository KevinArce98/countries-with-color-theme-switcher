// Hooks
import { useEffect, useRef, useState } from "react";

// Components
import { Button, ClickAwayListener, Grow, MenuItem, MenuList, Paper, Popper } from "@material-ui/core";
import FontAwesomeIcon from "./FontAwesomeIcon";

interface Props {
    regionSelected: string;
    changeRegion: (region: string) => void;
}

const Filter = ({ regionSelected, changeRegion }: Props) => {
    const [open, setOpen] = useState(false);
    const anchorRef = useRef<HTMLButtonElement>(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event: React.MouseEvent<EventTarget>) => {
        if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
            return;
        }

        setOpen(false);
    };

    function handleListKeyDown(event: React.KeyboardEvent) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        }
    }
    const prevOpen = useRef(open);
    useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current!.focus();
        }

        prevOpen.current = open;
    }, [open]);

    const handleChangeRegion = (e: React.MouseEvent<EventTarget>, value: string) => {
        handleClose(e);
        changeRegion(value);
    }

    return (
        <>
            <Paper className="inline-block">
                <Button
                    ref={anchorRef}
                    aria-controls={open ? 'menu-list-grow' : undefined}
                    aria-haspopup="true"
                    onClick={handleToggle}
                    className="filter-button w-48"
                    endIcon={
                        <FontAwesomeIcon iconName="fa-chevron-down" type="fal" style={{
                            fontSize: 12,
                            marginLeft: 11,
                            position: 'absolute',
                            top: 0,
                            margin: '0 auto',
                            bottom: 0,
                            display: 'flex',
                            alignItems: 'center',
                            right: 20
                        }}
                        />}
                >
                    {
                        regionSelected === '' ? 'Filter by Region' : regionSelected
                    }
                </Button>
                <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                    {({ TransitionProps, placement }) => (
                        <Grow
                            {...TransitionProps}
                            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                        >
                            <Paper className="filter-menu">
                                <ClickAwayListener onClickAway={handleClose}>
                                    <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                                        <MenuItem value="" onClick={(e) => handleChangeRegion(e, '')}>
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem onClick={(e) => handleChangeRegion(e, 'Africa')} value="Africa">Africa</MenuItem>
                                        <MenuItem onClick={(e) => handleChangeRegion(e, 'Americas')} value="Americas">Americas</MenuItem>
                                        <MenuItem onClick={(e) => handleChangeRegion(e, 'Asia')} value="Asia">Asia</MenuItem>
                                        <MenuItem onClick={(e) => handleChangeRegion(e, 'Europe')} value="Europe">Europe</MenuItem>
                                        <MenuItem onClick={(e) => handleChangeRegion(e, 'Oceania')} value="Oceania">Oceania</MenuItem>
                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper>
            </Paper>

        </>
    )
}

export default Filter
