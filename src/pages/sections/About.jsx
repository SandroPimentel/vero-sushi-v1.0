import '../../styles/pages/sections/About.scss';

const About = () => {

    return (
            <div className='about'>
                <h1>À Propos de moi</h1>
                <div className='about-content'>
                    <img src='assets/About.webp' alt='Sushi'/>
                    <p>
                        Faites la connaissance de Veronique, une femme qui n'a jamais été satisfaite de la qualité des sushis en France.
                        Elle a décidé de prendre les choses en main et a commencé à préparer ses propres sushis délicieux.
                        Sa passion pour les saveurs authentiques et son dévouement à la perfection ont conduit à la création de notre restaurant de sushis.
                        Venez découvrir la différence que la passion fait dans chaque bouchée !
                    </p>
                </div>
            </div>
    );
}

export default About;
