import {Link} from 'react-router-dom';
import DataStore from 'scripts/flux/stores/DataStore.js';


class Nav extends React.Component {
  render() {
    let allPages = DataStore.getAllPages();
        allPages = _.sortBy(allPages, [function(page) { return page.menu_order; }]); 
    return (
        <div id="nav-container">
            <nav>
                <Link to="/" onClick={this.props.handler} style={{marginRight: '10px'}} >Home</Link>

                {allPages.map((page) => {
                    if(page.slug != 'home'){
                       return(
                            <Link 
                                onClick={this.props.handler}
                                key={page.id} 
                                to={`/${page.slug}`} 
                                style={{marginRight: '10px'}}
                            >
                                {page.title.rendered}
                            </Link>
                        )                     
                   }
                })}
            </nav>
        </div>
      
    );
  }  
}


class Header extends React.Component {   
   constructor(props) {
    super(props);
    this.state = {
      isHidden: true,
    };
    this._onButtonClick = this._onButtonClick.bind(this);
  }

  _onButtonClick() {
    this.setState({
      isHidden: !this.state.isHidden,
    });
  }
  
    render() {
    // Sort pages by order

        return (
            <header>
            <img className="logo" onClick={this._onButtonClick.bind(this)} src={'./img/logo-black.png'} />
                {!this.state.isHidden && <Nav handler={this._onButtonClick} />}
            
            </header>
        );
    }
}



export default Header;
