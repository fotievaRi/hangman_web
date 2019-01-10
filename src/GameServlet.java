import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.PrintWriter;

public class GameServlet extends HttpServlet {
    DataBase dataBase;
    @Override
    public void init(){
        dataBase=new DataBase();
        try {
            dataBase.readFile();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }
    }
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/html");
        PrintWriter out = response.getWriter();
        out.println("<html><body>");
        HttpSession session = request.getSession(false);
        if(session != null&&dataBase.checkName((String)session.getAttribute("name"))){
            request.getRequestDispatcher("game.html").forward(request, response);
        }
        else{
            out.print("Please login first");
            request.getRequestDispatcher("login.html").include(request, response);
        }

        out.println("</html></body>");
        out.close();

    }
}
