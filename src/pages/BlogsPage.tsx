// src/pages/BlogsPage.tsx
import { Link } from 'react-router-dom';

export const BlogsPage = () => {
return (
    <div className="container-gray p-4">
    <h1 className="mb-4">Blogs</h1>
    <section>
        <div className="row g-4">
          {/* Blog 1 */}
        <div className="col-md-4">
            <div className="card h-100 shadow-sm">
            <img
                src="https://demartino.cl/wp-content/uploads/2022/11/Vino-De-Martino-es-elegido-entre-los-100-mejores-del-mundo.jpg"
                className="card-img-top"
                alt="Vino prestigioso"
            />
            <div className="card-body d-flex flex-column">
                <h5 className="card-title">El vino más prestigioso de Chile</h5>
                <p className="card-text flex-grow-1">
                Descubre la historia y el reconocimiento internacional del vino chileno considerado el más prestigioso: Don Melchor.
                </p>
                {/* Por ahora, este link no llevará a una página de detalle real,
                    pero la ruta /blogs/1 está lista para cuando la creemos */}
                <Link to="/blogs/1" className="btn btn-primary mt-auto">
                Leer más
                </Link>
            </div>
            </div>
        </div>
          {/* Puedes añadir más blogs aquí copiando la estructura "col-md-4" */}
        </div>
    </section>
    </div>
);
}