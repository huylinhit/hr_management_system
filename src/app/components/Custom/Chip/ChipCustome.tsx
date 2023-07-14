import styles from './ChipCustome.module.scss'
import classNames from 'classnames/bind';

interface Props {
    status: string,
    children: React.ReactNode,
}

const cx = classNames.bind(styles);

function ChipCustome({  status, children }: Props) {
    var activeStatus: string = "";

    switch (status) {
        case "withdrawn":
            {
                activeStatus = "withdrawn-";
                break;
            }
        case "payment":
            {
                activeStatus = "payment-";
                break;
            }
        case "approved":
            {
                activeStatus = "approved-";
                break;
            }
        case "rejected":
            {
                activeStatus = "rejected-";
                break;
            }
        case "pending":
            {
                activeStatus = "pending-";
                break;
            }
        case "cancel":
            {
                activeStatus = "cancel-";
                break;
            }
        case "waiting":
            {
                activeStatus = "waiting-";
                break;
            }
        default:
            {
                activeStatus = "";
                break;
            }
    }

    return (
        <div className={cx("wrapper")}>
            <div className={cx(`${activeStatus}container`)}>
                <p className={cx(`${activeStatus}content`)}>{children}</p>
            </div>
        </div>
    );
}

export default ChipCustome;