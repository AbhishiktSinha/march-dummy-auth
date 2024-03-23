import './styles/ErrorMessage.css'

export default function ErrorMessage({ errorMessage, dismissErrorHandler }) {

    return (
        <div className="error-message-modal">
            <div className="error-message">
                <h2>Error!</h2>
                <p className="error-content">{errorMessage}</p>

                <button
                    onClick={dismissErrorHandler}
                    className="dismiss-error-button">
                    OK
                </button>
            </div>
        </div>
    )
}