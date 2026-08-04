import { useScene } from '../../context/SceneContext';
import { useGalleryProjects } from '../../hooks/useSanityData';
import { PROFILE } from '../../data/profile';
import '../../styles/ScreenReaderOverlay.scss';

/**
 * Accessible HTML equivalent of the interactive 3D portfolio.
 * It also gives search engines and admissions readers a concise source of truth.
 */
const ScreenReaderOverlay = () => {
    const { hasEntered, isInRoom, currentRoom, teleportTo, requestExit } = useScene();
    const projects = useGalleryProjects();

    return (
        <div className="sr-overlay" role="complementary" aria-label="Accessible navigation for 3D portfolio">
            <a href="#sr-main-nav" className="sr-only sr-focusable">
                Skip to accessible navigation
            </a>

            <nav id="sr-main-nav" className="sr-only" aria-label="Portfolio rooms">
                <h1>{PROFILE.displayName} — {PROFILE.title}</h1>
                <h2>Portfolio Navigation</h2>

                {!hasEntered && (
                    <section aria-label="Admissions profile summary">
                        <p>{PROFILE.shortDescription}</p>
                        <p>{PROFILE.location}. Grade 12: {PROFILE.marks[2].score} ({PROFILE.marks[2].detail}).</p>
                        <p>Open the entrance doors to visit About Me first.</p>
                    </section>
                )}

                {hasEntered && !isInRoom && (
                    <>
                        <p>You are in the corridor. About Me is the first room:</p>
                        <ul>
                            <li><button onClick={() => teleportTo('about')} type="button">About Me — profile, academics, certificates and goals</button></li>
                            <li><button onClick={() => teleportTo('gallery')} type="button">Projects — cybersecurity tools, screenshots, demos and repositories</button></li>
                            <li><button onClick={() => teleportTo('studio')} type="button">Arts — graphite drawing archive</button></li>
                            <li><button onClick={() => teleportTo('contact')} type="button">Contact — email and GitHub</button></li>
                        </ul>
                    </>
                )}

                {hasEntered && isInRoom && (
                    <>
                        <p>
                            You are in the {currentRoom === 'about' ? 'About' :
                                currentRoom === 'gallery' ? 'Projects' :
                                    currentRoom === 'contact' ? 'Contact' :
                                        currentRoom === 'studio' ? 'Arts' : currentRoom} room.
                        </p>
                        <button onClick={requestExit} type="button">Go back to corridor</button>

                        {currentRoom === 'about' && (
                            <div aria-label="About room content">
                                <h3>About Me</h3>
                                <p>{PROFILE.about}</p>
                                <p>{PROFILE.goal}</p>

                                <section>
                                    <h4>Academic Results</h4>
                                    <ul>
                                        {PROFILE.marks.map((mark) => (
                                            <li key={mark.level}>{mark.level}: {mark.score} ({mark.detail})</li>
                                        ))}
                                    </ul>
                                </section>

                                <section>
                                    <h4>Security Projects</h4>
                                    <ul>
                                        {PROFILE.projects.map((project) => (
                                            <li key={project.title}><a href={project.github}>{project.title}</a> — {project.category}</li>
                                        ))}
                                    </ul>
                                </section>

                                <section>
                                    <h4>Certificates</h4>
                                    <ul>
                                        {PROFILE.certificates.map((certificate) => (
                                            <li key={certificate.label}><a href={certificate.url}>{certificate.title}</a> — {certificate.issuer}, {certificate.year}</li>
                                        ))}
                                    </ul>
                                </section>

                                <section>
                                    <h4>Goals</h4>
                                    <ul>{PROFILE.goals.map((goal) => <li key={goal}>{goal}</li>)}</ul>
                                </section>
                            </div>
                        )}

                        {currentRoom === 'gallery' && (
                            <div aria-label="Projects room content">
                                <h3>Security Projects</h3>
                                <p>Browse practical security projects displayed on interactive paper cards.</p>
                                {projects && projects.length > 0 && (
                                    <ul>
                                        {projects.map((project, index) => (
                                            <li key={project.id || index}>
                                                <h4>{project.title}</h4>
                                                <p>{project.description}</p>
                                                {project.url && <a href={project.url}>Visit {project.title}</a>}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        )}

                        {currentRoom === 'contact' && (
                            <div aria-label="Contact room content">
                                <h3>Contact Me</h3>
                                <p>Email {PROFILE.email} or visit GitHub at {PROFILE.githubUrl}.</p>
                            </div>
                        )}

                        {currentRoom === 'studio' && (
                            <div aria-label="Arts room content">
                                <h3>Arts</h3>
                                <p>Graphite drawing frames are prepared and will be filled as new drawings are completed.</p>
                            </div>
                        )}

                        <h3>Quick Navigation</h3>
                        <ul>
                            {currentRoom !== 'about' && <li><button onClick={() => teleportTo('about')} type="button">Go to About</button></li>}
                            {currentRoom !== 'gallery' && <li><button onClick={() => teleportTo('gallery')} type="button">Go to Projects</button></li>}
                            {currentRoom !== 'studio' && <li><button onClick={() => teleportTo('studio')} type="button">Go to Arts</button></li>}
                            {currentRoom !== 'contact' && <li><button onClick={() => teleportTo('contact')} type="button">Go to Contact</button></li>}
                        </ul>
                    </>
                )}
            </nav>

            <div aria-live="polite" aria-atomic="true" className="sr-only">
                {isInRoom && `Entered ${currentRoom} room`}
            </div>
        </div>
    );
};

export default ScreenReaderOverlay;
