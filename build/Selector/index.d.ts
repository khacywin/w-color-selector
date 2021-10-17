import React from 'react';
interface Props {
    select?: string;
    fnSelected: (color: string) => void;
    fnClosePopup: () => void;
}
declare const _default: React.MemoExoticComponent<(props: Props) => JSX.Element>;
export default _default;
