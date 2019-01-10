import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.logging.Logger;

public class LoginServlet extends HttpServlet {
    DataBase dataBase= new DataBase();
    Logger logger = Logger.getLogger(LoginServlet.class.getName());

    @Override
    public void init(){
        try {
            dataBase.readFile();
        }
        catch (IOException e){
            logger.info(e.getMessage());

        }
    }
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/html");
        PrintWriter out = response.getWriter();
        out.println("<html><body>");
        String name = request.getParameter("username");
        String password = request.getParameter("password");
        String login= request.getParameter("login");

        if(login!=null){
            if(dataBase.checkNameAndPassword(name, password)){
                HttpSession session = request.getSession();
                session.setAttribute("name", name);
                request.getRequestDispatcher("/profile.html").forward(request, response);
            }
            else{
                out.print("Sorry, username or password error!");
                request.getRequestDispatcher("login.html").include(request, response);
            }
        }
        out.println("</html></body>");
        out.close();

    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }
}
