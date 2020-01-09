import React, { Component } from 'react';
import './main.css';
import { fetchGame } from './actions';
import { connect } from 'react-redux';

class Homepage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tracks: [],
            hasMoreItems: true,
            nextPage: 1
        };
    }
    componentDidMount() {
        window.scrollTo(0, 0);

    }

    loadItems() {
        var self = this;
        var page = this.state.nextPage;
        this.props.fetchGame('postedDate', 8, page);
        const { homeGame } = this.props;
        if (homeGame != null) {
            var tracks = self.state.tracks;
            tracks.push(...homeGame.gamesByType.games);
            if (homeGame.gamesByType.hasMoreGames) {
                self.setState((prevState) => {
                    return {
                        tracks: tracks,
                        nextPage: prevState.nextPage + 1
                    }
                });
            } else {
                self.setState({
                    tracks: tracks,
                    hasMoreItems: false
                });
            }
        }
    }

    render() {
        const { t } = this.props;

        return (

            <div className="container-fluid container-index">

                <section>
                    <div className="row row-index">
                        <div className="col-md-12">
                            <h1 id="newest-Game">&nbsp;</h1>
                        </div>
                        <div className="col-md-12">
                            <h1 className="title">{t('common.home.type.new')}</h1>
                           
                        </div>

                     


                    </div>
                </section>
            </div>

        );

    }
}


const mapStateToProps = (state) => {
    return {
        homeGame: state.homeGame
    }
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchGame: (sort, limit, page) => {
            dispatch(fetchGame(sort, limit, page));
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Homepage);