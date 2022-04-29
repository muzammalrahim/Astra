import React, { Component } from "react";
import { Row, Col } from "antd";

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        console.log(error);
        return { hasError: true };
    }

    render() {
        if (this.state.hasError) {
            return (
                <Row
                    className="kp-form-container-body"
                    justify="center"
                    align="middle"
                    style={{ height: "100vh" }}
                >
                    <Col span={10}>
                        <h1
                            style={{
                                textAlign: "center",
                                background: "rgb(255 255 255 / 50%)",
                                padding: "20px",
                                borderRadius: "10px",
                            }}
                        >
                            Currently experiencing some trouble. <br></br>Please try again in a short while.
                        </h1>
                    </Col>
                </Row>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
