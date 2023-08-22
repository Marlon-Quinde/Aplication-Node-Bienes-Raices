import express, {Request, Response} from "express";
import authRoutes from "./modules/auth/routes";

const app = express();

app.set('port', 3000);

app.use('/auth', authRoutes  );

app.listen(app.get('port'), () => {
    console.log('EL SERVIDOR ESTA LEVANTADO')
})